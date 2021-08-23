import React, { useEffect } from "react";
import axios from "axios";
import { getAccessToken, Juno } from "juno-api-wrapper";

const clientId = "4E7JDKRxuu8WzivH";

const clientSecret = "QXMsdTz%Ck1qLEn.Z1H49{FHFW{nh_fm";

function JunoTest() {
    
  
  useEffect(() => {
    const fetchJuno = async () => {
      const token = await getAccessToken(clientId, clientSecret);
      console.log(token);
      const options = {
        accessToken: token,
        resourceToken: process.env.TOKEN,
      };
      const juno = new Juno(options);
      const balance = juno.getBalance();
      console.log(balance);
    }

    fetchJuno()
  }, []);

  return <div></div>;
}

export default JunoTest;
