import { toArray } from "lodash";
import { reaction } from "mobx";
import { State } from "~/store/state";

const updateTitle = (title: string) => (document.title = title);

const updateTags = <T = React.HTMLAttributes<Element>>(
  type: "meta" | "link"
) => (attrsList: T[]) => {
  const oldTags: Node[] = toArray(
    document.head.querySelectorAll(`${type}[data-head="true"]`)
  );
  const newTags: Node[] = [];

  attrsList.forEach(attrs => {
    const newTag = document.createElement(type);

    Object.keys(attrs).forEach(name =>
      newTag.setAttribute(name, (attrs as any)[name])
    );

    newTag.setAttribute("data-head", "true");

    const existingTag = oldTags.find(oldTag => oldTag.isEqualNode(newTag));

    if (existingTag) {
      oldTags.splice(oldTags.indexOf(existingTag), 1);
    } else {
      newTags.push(newTag);
    }
  });

  oldTags.forEach(tag => document.head.removeChild(tag));
  newTags.forEach(tag => document.head.appendChild(tag));
};

const updateMeta = updateTags("meta");
const updateLink = updateTags("link");

const head = (state: State) => {
  reaction(() => state.head.title, updateTitle, { name: "head.updateTitle" });
  reaction(() => state.head.meta, updateMeta, { name: "head.updateMeta" });
  reaction(() => state.head.link, updateLink, { name: "head.updateLink" });
};

export default head;
