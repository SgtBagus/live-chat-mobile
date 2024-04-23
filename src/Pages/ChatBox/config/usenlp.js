import * as React from "react";

import { dock  } from "@nlpjs/core";
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

export const useNLP = ({ data, sendMessage }) => {
  const [respon, setRespon] = React.useState({ answer: "" });

  React.useEffect(() => {
    boot({ data }).then((r) => {
      return nlp.process("en", sendMessage).then((res) => {
        setRespon({ ...res });
      });
    });
  }, [data, sendMessage]);

  return { respon };
}
