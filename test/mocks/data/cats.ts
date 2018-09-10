import { NormalizedEntities } from "~/domain/Normalized";

const cats: Readonly<NormalizedEntities["cats"]> = {
  "0": {
    id: "0",
    title: "Cat 0",
    text: "Lorem ipsum dolor sit amet",
    imageUrl: "https://example.com/0"
  },
  "1": {
    id: "1",
    title: "Cat 1",
    text: "Lorem ipsum dolor sit amet",
    imageUrl: "https://example.com/1"
  },
  "2": {
    id: "2",
    title: "Cat 2",
    text: "Lorem ipsum dolor sit amet",
    imageUrl: "https://example.com/2"
  }
};

export default cats;
