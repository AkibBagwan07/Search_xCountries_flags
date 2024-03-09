// import axios from "axios";
// import { useState, useEffect } from "react";
// import styles from "./search.module.css"

// export default function Search() {
//   const [flags, setFlags] = useState([]);
//   const [change, setChange] = useState(null);
//   console.log(change);
//   useEffect(() => {
//     (async function () {
//       try {
//         let res = await axios.get("https://restcountries.com/v3.1/all");
//         // console.log(res.data);
//         setFlags(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     (async function () {
//       try {
//         if (change !== null) {
//           let res = await axios.get(
//             `https://restcountries.com/v3.1/name/${change}`
//           );
//           setFlags([]);
//           setFlags(res.data);
//         }
//       } catch (error) {
//         if (error.response.status === 404) {
//           setFlags([]);
//           setChange(null);
//         }
//         console.log(error);
//       }
//       // finally {
//       //   setChange(null);
//       // }
//     })();
//   }, [change]);
//   return (
//     <div className={styles.App}>
//       <div className={styles.searchParent}>
//         <input
//           onChange={(e) => {
//             if (e.target.value) {
//               setChange(e.target.value);
//             } else {
//               setChange(null);
//             }
//           }}
//           className={styles.search}
//           type="text"
//           placeholder="Search for Countries..."
//         />
//       </div>
//       <div className={styles.countryCard}>
//         {flags.length > 0 &&
//           flags.map((flag) => (
//             <div className={styles.flagChild} key={flag.cca3}>
//               <img className={styles.flagImg} src={flag.flags.png} alt="" />
//               <p>{flag.name.common}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
import "./search.css"
import { useEffect, useState } from "react";

export default function Search() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(data);
  }, [search,countries]);

  console.log(countries);
  return (
    <div>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="App">
        {search === ""
          ? countries.map((country) => {
              return (
                <div className="countryCard">
                  {country.name.common!==undefined && country.flags.png!==undefined &&
                  <div>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <h2>{country.name.common}</h2>
                  </div>}
                </div>
              );
            })
          : filtered.map((country) => {
              return (
                <div className="countryCard">
                  {country.name.common!==undefined && country.flags.png!==undefined &&
                  <div>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <h2>{country.name.common}</h2>
                  </div>}
                </div>
              );
            })}
      </div>
    </div>
  );
}
