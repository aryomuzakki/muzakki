import Image from 'next/image'

export default function Home() {
  return (
    <main className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-between tw-p-24">
      <div className="tw-z-10 tw-max-w-5xl tw-w-full tw-items-center tw-justify-between tw-font-mono tw-text-sm lg:tw-flex">
        <p className="tw-fixed tw-left-0 tw-top-0 tw-flex tw-w-full tw-justify-center tw-border-b tw-border-gray-300 tw-bg-gradient-to-b tw-from-zinc-200 tw-pb-6 tw-pt-8 tw-backdrop-blur-2xl dark:tw-border-neutral-800 dark:tw-bg-zinc-800/30 dark:tw-from-inherit lg:tw-static lg:tw-w-auto  lg:tw-rounded lg:tw-border lg:tw-bg-gray-200 lg:tw-p-4 lg:dark:tw-bg-zinc-800/30">
          Hi, I'm Muhammad Aryo Muzakki
        </p>

      </div>

      <div className="tw-mb-32 tw-grid tw-text-center lg:tw-max-w-5xl lg:tw-w-full lg:tw-mb-0 lg:tw-grid-cols-4 lg:tw-text-left">
        <a
          href="/cv"
          className="tw-group tw-rounded-lg tw-border tw-px-5 tw-py-4 tw-transition-colors tw-border-gray-200 hover:tw-border-gray-300 hover:tw-bg-gray-100 dark:tw-border-neutral-700 hover:dark:tw-border-neutral-600 hover:dark:tw-bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="tw-mb-3 tw-text-2xl tw-font-semibold">
            Read My CV{' '}
            <span className="tw-inline-block tw-transition-transform group-hover:tw-translate-x-1 motion-reduce:tw-transform-none">
              -&gt;
            </span>
          </h2>
          <p className="tw-m-0 tw-max-w-[30ch] tw-text-sm tw-opacity-50">
            My Curriculum Vitae
          </p>
        </a>
      </div>
    </main>
  )
}
