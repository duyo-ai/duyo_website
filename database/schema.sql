-- Supabase Database Schema for Cutple Admin

-- Note: auth.users 테이블은 Supabase에서 자동으로 관리되므로 수정하지 않습니다

-- Create users profile table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email_verified boolean default false,
  last_sign_in_at timestamp with time zone
);

-- Create download_requests table
create table public.download_requests (
  id bigserial primary key,
  email text not null,
  platform text not null check (platform in ('macOS', 'Windows')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sent boolean default false,
  sent_at timestamp with time zone
);

-- Enable RLS on our custom tables
alter table public.users enable row level security;
alter table public.download_requests enable row level security;

-- Create RLS policies for users table
create policy "Users can view own profile" 
  on public.users 
  for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.users 
  for update 
  using (auth.uid() = id);

-- Create RLS policies for download_requests table
create policy "Anyone can insert download requests" 
  on public.download_requests 
  for insert 
  with check (true);

-- Admin users can view/update download requests
-- For now, we'll allow authenticated users (can be refined later)
create policy "Authenticated users can view download requests" 
  on public.download_requests 
  for select 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update download requests" 
  on public.download_requests 
  for update 
  using (auth.role() = 'authenticated');

-- Function to handle new user creation
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, name, email_verified, last_sign_in_at)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name',
    new.email_confirmed_at is not null,
    new.last_sign_in_at
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create user profile
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to handle user updates
create or replace function public.handle_user_update() 
returns trigger as $$
begin
  update public.users 
  set 
    email = new.email,
    email_verified = new.email_confirmed_at is not null,
    last_sign_in_at = new.last_sign_in_at
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically update user profile
drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- Create indexes for better performance
create index idx_users_email on public.users(email);
create index idx_users_created_at on public.users(created_at);
create index idx_download_requests_email on public.download_requests(email);
create index idx_download_requests_created_at on public.download_requests(created_at);
create index idx_download_requests_sent on public.download_requests(sent);

-- Insert sample data (for development)
-- Note: This should be run after creating an admin user through Supabase Auth
-- INSERT INTO public.download_requests (email, platform, sent) VALUES
-- ('user@example.com', 'macOS', true),
-- ('another@gmail.com', 'Windows', false),
-- ('mobile@cutple.com', 'macOS', true);
