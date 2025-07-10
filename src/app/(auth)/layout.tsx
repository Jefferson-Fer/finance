import Image from 'next/image'

interface LayoutSharedFormsProps {
  children: React.ReactNode
}

export default async function LayoutSharedForms({
  children,
}: LayoutSharedFormsProps) {
  return (
    <div className="w-full h-screen flex lg:min-h-[600px] xl:min-h-screen">
      <div className="hidden bg-muted lg:flex relative w-full">
        <Image
          src="/images/lobby_hero.png"
          alt="Image"
          sizes="100vw 100vh"
          fill
          priority
          className="size-full object-cover w-full"
        />
      </div>
      {children}
    </div>
  )
}
