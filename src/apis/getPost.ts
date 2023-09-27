import instance from "./index";

function getPosts(queryString: string) {
  return instance
    .get(`/posts${queryString}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
}

export default getPosts;
