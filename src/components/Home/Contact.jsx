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
    </section>
  );
};

export default Contact;
