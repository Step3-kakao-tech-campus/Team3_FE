interface PostOption {
  title: string;
  districtId: number;
  startTime: Date;
  dueTime: Date;
  content: string;
}

export default async function postRegisterPosts(postOption: PostOption) {
  const options = {
    method: "POST",
    body: JSON.stringify(postOption),
  };

  const data = await fetch("https://server.jagaldol.dev:8080/api/posts", options).then((res) => res.json());

  return data;
}
