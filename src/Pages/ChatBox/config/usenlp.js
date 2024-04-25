import { dock } from "@nlpjs/core";
import { LangEn } from "@nlpjs/lang-en";
import { Nlp } from "@nlpjs/nlp";

let nlp;

async function boot({ data = {} }) {
  if (!nlp) {
    await dock.start();
    const container = dock.getContainer();

    container.use(Nlp);
    container.use(LangEn);

    nlp = container.get("nlp");
    await nlp.addCorpus(data);

    nlp.settings.autoSave = false;

    await nlp.train();
  }
}

export const USE_NLP = async ({ data, sendMessage }) => {
  const respon = (await boot({ data }).then((r) =>
    nlp.process("en", sendMessage).then((res) => {
      return { ...res };
    })
  )) || { answer: "" };

  return respon;
};
