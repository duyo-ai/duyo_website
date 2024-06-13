import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'
import Image from 'next/image'
const logos = [
  {
    name: 'Larvel',
    url: logoLaravel,
  },
  {
    name: 'Nextjs',
    url: logoMirage,
  },
  {
    name: 'Prime',
    url: logoStatamic,
  },
  {
    name: 'Trustpilot',
    url: logoTransistor,
  },
  {
    name: 'Webflow',
    url: logoTuple,
  },

  {
    name: 'Airbnb',
    url: logoStaticKit,
  },
  {
    name: 'Larvel',
    url: logoLaravel,
  },
  {
    name: 'Nextjs',
    url: logoMirage,
  },
]

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="animate-logo-cloud flex shrink-0 flex-row justify-around gap-10"
              >
                {logos.map((logo, key) => (
                  <Image
                    key={key}
                    src={logo.url}
                    className="w-full px-2  brightness-100"
                    alt={`${logo.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedLogoCloud
