"use client";

import { useEffect, useState } from "react";

const Contact = () => {
  const [contactList, setProjectList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const profileJSON = await response.json();
          setProjectList(profileJSON.data.contact);
        }
      } catch (err) {
        console.error(err.message || err);
      }
    })();

    return () => {};
  }, []);

  const openMail = ({ subject, message } = {}) => {
    const anchorEl = document.createElement("a");
    anchorEl.href = `mailto:aryo.muzakki@gmail.com?&subject=${subject}&body=${message}`;
    anchorEl.target = "_blank";
    document.body.appendChild(anchorEl);
    anchorEl.click();
    document.body.removeChild(anchorEl);
  };

  return (
    <section
      id="contact"
      className="tw-flex tw-w-full tw-scroll-mt-8 tw-flex-col tw-items-center tw-justify-evenly tw-bg-gradient-primary tw-p-6 sm:tw-scroll-m-0 sm:tw-p-12 lg:tw-p-24"
    >
      <div className="tw-my-8 tw-w-full tw-border-b-2 tw-border-b-primary-200 tw-pb-2">
        <h3 className="tw-text-2xl tw-font-extrabold tw-uppercase tw-tracking-widest">
          Contact
        </h3>
      </div>
      <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-between tw-gap-8 lg:tw-flex-row">
        <div className="tw-w-full tw-rounded-md tw-bg-primary-800/50 tw-p-7 lg:tw-w-auto lg:tw-min-w-[512px]">
          <form id="message-form" className="tw-flex tw-flex-col tw-gap-8">
            <div className="tw-full tw-flex tw-flex-col tw-gap-x-4 tw-gap-y-8 md:tw-flex-row">
              <label className="tw-du-form-control tw-w-full lg:tw-max-w-xs">
                <div className="tw-du-label">
                  <span className="tw-du-label-text !tw-text-primary-300">
                    Name
                  </span>
                </div>

                <input
                  type="text"
                  name="fullname"
                  placeholder="John"
                  className="tw-du-input tw-du-input-bordered tw-w-full !tw-bg-primary-800/50 !tw-placeholder-primary-300/50 lg:tw-max-w-xs"
                  required
                />
              </label>

              <label className="tw-du-form-control tw-w-full lg:tw-max-w-xs">
                <div className="tw-du-label">
                  <span className="tw-du-label-text !tw-text-primary-300">
                    Phone / WhatsApp Number
                  </span>
                </div>

                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="628123xxxxxx"
                  className="tw-du-input tw-du-input-bordered tw-w-full !tw-bg-primary-800/50 !tw-placeholder-primary-300/50 lg:tw-max-w-xs"
                  required
                />
              </label>
            </div>

            <label className="tw-du-form-control">
              <div className="tw-du-label">
                <span className="tw-du-label-text !tw-text-primary-300">
                  Message
                </span>
              </div>
              <textarea
                name="message"
                className="tw-du-textarea tw-du-textarea-bordered tw-h-32 !tw-bg-primary-800/50 !tw-text-base !tw-placeholder-primary-300/50"
                placeholder="Hi, I'm from <somewhere> and would like to talk about <something>"
                required
              ></textarea>
            </label>
            <div className="tw-flex tw-justify-between">
              <button type="reset" className="btn-primary btn-outline !tw-text-base">
                Reset
              </button>
              <button
                type="submit"
                className="btn-primary !tw-text-base"
                onClick={(ev) => {
                  ev.preventDefault();

                  const messageForm = document.getElementById("message-form");
                  const messageFormData = new FormData(messageForm);

                  const fullnameValue = messageFormData.get("fullname");
                  const phoneNumberValue = messageFormData.get("phoneNumber");
                  const messageValue = messageFormData.get("message");

                  if ([fullnameValue, phoneNumberValue, messageValue].some(val => val === "")) {
                    alert("All fields are required")
                    return false;
                  }

                  const subject = `[I'm ${fullnameValue} and I have something to say]`;

                  const message = `Name: ${fullnameValue}\nPhone/WhatsApp: ${phoneNumberValue}\nMessage: ${messageValue}`;

                  const encodedSubject = encodeURIComponent(subject);
                  const encodedMessage = encodeURIComponent(message);

                  openMail({
                    subject: encodedSubject,
                    message: encodedMessage,
                  });
                }}
              >
                <span className="tw-mr-2">Send Message</span>
                {/* fluent:send-20-filled */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                <path fill="currentColor" d="M2.724 2.053a.5.5 0 0 0-.707.576l1.498 5.618a.5.5 0 0 0 .4.364l6.855 1.142c.279.047.279.447 0 .494l-6.854 1.142a.5.5 0 0 0-.401.364l-1.498 5.618a.5.5 0 0 0 .707.576l15-7.5a.5.5 0 0 0 0-.894z"></path>
              </svg>
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="tw-text-primary-300">OR</p>
        </div>

        <div className="lg:tw-w-full lg:tw-max-w-xs">
          <ul className="tw-flex tw-flex-wrap tw-justify-center tw-gap-8 lg:tw-flex-col lg:tw-justify-start lg:tw-gap-4">
            <li className="">
              <a
                href="https://instagram.com/aryo.muzakki"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* simple-icons:instagram */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"></path>
                </svg>
                <span className="tw-ml-4">aryo.muzakki</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/aryomuzakki"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* simple-icons:linkedin */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"></path>
                </svg>
                <span className="tw-ml-4">aryomuzakki</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aryomuzakki"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* simple-icons:github */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
                <span className="tw-ml-4">aryomuzakki</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:aryo.muzakki@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* mdi:email */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
                </svg>
                <span className="tw-ml-4">aryo.muzakki@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="tel:6281376799660"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* mdi:phone */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25c1.12.37 2.32.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"></path>
                </svg>
                <span className="tw-ml-4">+62 813 7679 9660</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6281376799660"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-w-max tw-flex-shrink-0 tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"
              >
                {/* simple-icons:whatsapp */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"></path>
                </svg>
                <span className="tw-ml-4">+62 813 7679 9660</span>
              </a>
              {/* <details className="tw-du-dropdown tw-du-dropdown-top"> */}
              {/* <summary className="tw-flex tw-w-max tw-flex-shrink-0 tw-cursor-pointer tw-select-none tw-p-3 tw-transition hover:tw-text-primary-500 focus:tw-text-primary-300"> */}
              {/* mdi:phone */}
              {/* prettier-ignore */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25c1.12.37 2.32.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"></path>
                  </svg>
                  <span className="tw-ml-4">+62 813 7679 9660</span> */}
              {/* </summary> */}
              {/* <ul className="glass-bg-primary tw-du-menu tw-du-dropdown-content tw-z-[1] tw-mt-2 tw-w-52 tw-overflow-hidden tw-rounded-lg tw-p-2 tw-shadow">
                  <li className="">
                    <a
                      href="tel:6281376799660"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Call
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="https://wa.me/6281376799660"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li className="">
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      Copy
                    </button>
                  </li>
                </ul> */}
              {/* </details> */}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
