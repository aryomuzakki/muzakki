import stackList from "./stackList.json";
import experienceList from "./experienceList.json";

export async function GET(request) {
  const data = {
    name: "Muhammad Aryo Muzakki",
    stacks: stackList,
    experiences: experienceList,
    address: {
      text: "Medan",
      url: "",
    },
    contact: {
      whatsapp: {
        text: "0813 7679 9660",
        url: "wa.me/6281376799660",
      },
      email: {
        text: "aryo.muzakki@gmail.com",
        url: "mailto:aryo.muzakki@gmail.com",
      },
    },
    socialMedia: {
      github: {},
      linkedin: {},
      instagram: {},
    },
  };

  const response = Response.json({
    data,
    message: "success",
  });

  return response;
}
