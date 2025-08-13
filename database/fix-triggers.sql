-- 트리거 함수 다시 생성 (로그 추가)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  -- 로그 출력
  raise log 'New user trigger executed for user: %', new.id;
  
  insert into public.users (id, email, name, email_verified, last_sign_in_at)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email_confirmed_at is not null,
    new.last_sign_in_at
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(excluded.name, public.users.name),
    email_verified = excluded.email_verified,
    last_sign_in_at = excluded.last_sign_in_at;
    
  raise log 'User profile created/updated for: %', new.email;
  return new;
exception when others then
  raise log 'Error in handle_new_user: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer;

-- 기존 트리거 삭제 후 다시 생성
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 업데이트 트리거도 다시 생성
create or replace function public.handle_user_update() 
returns trigger as $$
begin
  raise log 'User update trigger executed for user: %', new.id;
  
  update public.users 
  set 
    email = new.email,
    email_verified = new.email_confirmed_at is not null,
    last_sign_in_at = new.last_sign_in_at
  where id = new.id;
  
  -- 사용자가 없으면 생성
  if not found then
    insert into public.users (id, email, name, email_verified, last_sign_in_at)
    values (
      new.id, 
      new.email, 
      coalesce(new.raw_user_meta_data->>'name', ''),
      new.email_confirmed_at is not null,
      new.last_sign_in_at
    );
  end if;
  
  return new;
exception when others then
  raise log 'Error in handle_user_update: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- 관리자용 임시 정책 (모든 인증된 사용자가 조회 가능)
drop policy if exists "Admin can view users" on public.users;
create policy "Admin can view users" 
  on public.users 
  for select 
  using (auth.role() = 'authenticated');

-- 백업용: 수동으로 현재 auth.users의 모든 사용자를 public.users에 삽입
-- (이미 존재하는 사용자들을 위해)
insert into public.users (id, email, name, email_verified, last_sign_in_at)
select 
  au.id,
  au.email,
  coalesce(au.raw_user_meta_data->>'name', ''),
  au.email_confirmed_at is not null,
  au.last_sign_in_at
from auth.users au
where not exists (
  select 1 from public.users pu where pu.id = au.id
)
on conflict (id) do nothing;
