import Head from 'next/head'

interface Props {
  children: JSX.Element | JSX.Element[]
  title: string
  pageDescription: string
  imageFullUrl?: string
}

const ShopLayout = ({ title, pageDescription, imageFullUrl, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />

        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>

      <nav></nav>

      <main className='main'>{children}</main>

      <footer></footer>
    </>
  )
}

export default ShopLayout
