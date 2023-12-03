import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitle from '../components/Section/Title'
import { appTitle, getPageTitle } from '../config'
import { mdiSnowmobile } from '@mdi/js'

const ResponsivePage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Responsive')}</title>
      </Head>

      <SectionTitle icon={mdiSnowmobile} title="Mobile & Tablet"></SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
          <Image
            src="https://static.justboil.me/templates/one/one-tailwind-vue-mobile.png"
            width={1920}
            height={960}
            alt={`Mobile & Tablet - ${appTitle}`}
            className="block"
          />
        </div>
      </SectionMain>

      <SectionTitle icon={mdiSnowmobile} title="Mobile & Tablet"></SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
          <Image
            src="https://static.justboil.me/templates/one/one-tailwind-vue-1024.png"
            width={1920}
            height={960}
            alt={`Small laptop 1024px - ${appTitle}`}
            className="block"
          />
        </div>
      </SectionMain>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
          <Image
            src="https://static.justboil.me/templates/one/one-tailwind-vue-1024-menu-open.png"
            width={1920}
            height={960}
            alt={`Small laptop 1024px (menu is open) - ${appTitle}`}
            className="block"
          />
        </div>
      </SectionMain>

      <SectionTitle icon={mdiSnowmobile} title="Mobile & Tablet"></SectionTitle>

      <SectionMain>
        <div className="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
          <Image
            src="https://static.justboil.me/templates/one/one-tailwind-vue-widescreen.png"
            width={1920}
            height={960}
            alt={`Laptop & desktop - ${appTitle}`}
            className="block"
          />
        </div>
      </SectionMain>
    </>
  )
}

ResponsivePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ResponsivePage
