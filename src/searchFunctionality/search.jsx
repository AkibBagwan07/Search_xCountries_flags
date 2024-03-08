import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./search.module.css"

export default function Search() {
  const [flags, setFlags] = useState([]);
  const [change, setChange] = useState(null);
  console.log(change);
  useEffect(() => {
    (async function () {
      try {
        let res = await axios.get("https://restcountries.com/v3.1/all");
        // console.log(res.data);
        setFlags(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        if (change !== null) {
          let res = await axios.get(
            `https://restcountries.com/v3.1/name/${change}`
          );
          setFlags([]);
          setFlags(res.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setFlags([]);
          setChange(null);
        }
        console.log(error);
      }
      // finally {
      //   setChange(null);
      // }
    })();
  }, [change]);
  return (
    <div className={styles.App}>
      <div className={styles.searchParent}>
        <input
          onChange={(e) => {
            if (e.target.value) {
              setChange(e.target.value);
            } else {
              setChange(null);
            }
          }}
          className={styles.search}
          type="text"
          placeholder="Search for Countries..."
        />
      </div>
      <div className={styles.countryCard}>
        {flags.length > 0 &&
          flags.map((flag) => (
            <div className={styles.flagChild} key={flag.cca3}>
              <img className={styles.flagImg} src={flag.flags.png} alt="" />
              <p>{flag.name.common}</p>
            </div>
          ))}
        {flags.length === 0 && ""}
      </div>
    </div>
  );
}
