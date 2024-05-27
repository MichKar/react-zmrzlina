import React, { useState, useEffect } from "react";
import "./App.css";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Button from "./components/Button";
import Clock from "./components/Clock";
import TextArea from "./components/TextArea";
import File from "./components/File";
import saveText from "./functions/saveText";
import ProgressBar from "./components/ProgressBar";
import validateFloat from "./functions/validateFloat";

const App = () => {
  const [scoop, setScoop] = useState(1);
  const [taste, setTaste] = useState("vanilková");
  const [topping, setTopping] = useState("");
  const [type, setType] = useState("smetanová");
  const [disk, setDisk] = useState("50");
  const [scitanec1, setScitanec1] = useState("");
  const [scitanec2, setScitanec2] = useState("");
  const [soucet, setSoucet] = useState("");
  const [text, setText] = useState("");
  const initialCountDown = 10;
  const [countDown, setCountDown] = useState(initialCountDown);

  // prompt na zadání sčítance 1
  useEffect(() => {
    input1();
  }, []);
  const input1 = () => {
    let temp = prompt("Zadejte prvního člena součtu.");
    while (!validateFloat(temp)) {
      temp = prompt("Zadejte první číslo (musí jít o číselnou hodnotu).");
    }
    setScitanec1(temp);
  };

  const handleData = (data, source) => {
    switch (source) {
      case "scoops": {
        setScoop(data);
        break;
      }
      case "taste": {
        setTaste(data);
        break;
      }
      case "chb-top": {
        setTopping(data);
        break;
      }
      case "sel-type": {
        setType(data);
        break;
      }
      case "range": {
        setDisk(data);
        break;
      }
      case "cislo1": {
        setScitanec1(data);
        break;
      }
      case "cislo2": {
        setScitanec2(data);
        break;
      }
      case "t-area": {
        setText(data);
        break;
      }
      case "file": {
        setText(data);
        break;
      }

      default:
        break;
    }
  };

  const handleEvent = (source) => {
    switch (source) {
      case "btn-plus": {
        if (scitanec1 !== 0 && scitanec2 !== 0) {
          const sum = parseInt(scitanec1) + parseInt(scitanec2);
          setSoucet(sum.toString());
        } else {
          setSoucet("Nejsou zadány oba sčítance");
        }
        break;
      }
      case "download": {
        saveText(text);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  const progress =
    countDown > 0
      ? ((initialCountDown - countDown) / initialCountDown) * 100
      : 100;

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="row vysledek">
                VÝSLEDNÁ ZMRZLINA:
                <br />
                {taste} {topping}, {scoop} kopečky, {type}
              </div>
              <div className="row">
                <RbGroup
                  label="Příchuť"
                  id="taste"
                  handleData={handleData}
                  selectedValue={taste}
                  dataIn={[
                    { label: "vanilková", value: "vanilková" },
                    { label: "čokoládová", value: "čokoládová" },
                    { label: "míchaná", value: "míchaná" },
                  ]}
                />
              </div>
              <div className="row">
                <ChbGroup
                  label="Něco navrch?"
                  id="chb-top"
                  handleData={handleData}
                  selectedValue={topping}
                  dataIn={[
                    { label: "kousky oříšků", value: "s kousky oříšků " },
                    {
                      label: "karamelové křupinky",
                      value: "s karamelovými křupinkami ",
                    },
                    { label: "čoko hobliny", value: "s čoko hoblinami " },
                  ]}
                />
              </div>
              <div className="row">
                <NumImp
                  label="Počet kopečků (max. 4)"
                  id="scoops"
                  minNr={1}
                  maxNr={4}
                  handleData={handleData}
                  dataIn={scoop}
                />
              </div>
              <div className="row">
                <Select
                  dataIn={["smetanová", "jogurtová", "nízkotučná"]}
                  label="Vyberte druh zmrzliny"
                  handleData={handleData}
                  selectedValue={type}
                  id="sel-type"
                />
              </div>
              <div className="row">
                <Range
                  min={0}
                  max={100}
                  label="Místo na disku"
                  handleData={handleData}
                  dataIn={disk}
                  id="range"
                />
              </div>
              <div className="row">
                <Clock /> zbývá {disk} % místa na disku{" "}
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <ProgressBar id="progress-bar" dataIn={progress} />
              </div>
              <div className="row">
                Instalace probíhá, čekejte {countDown} sekund
              </div>
              <div className="row">
                <div className="col-6">
                  <NumImp
                    label="sčítanec 1"
                    id="cislo1"
                    handleData={handleData}
                    dataIn={scitanec1}
                  />
                </div>
                <div className="col-6">
                  {" "}
                  <NumImp
                    label="sčítanec 2"
                    id="cislo2"
                    handleData={handleData}
                    dataIn={scitanec2}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Button
                    label="Vypočítej součet"
                    handleEvent={handleEvent}
                    id="btn-plus"
                  />
                </div>
                <div className="col-6">{soucet}</div>
              </div>
              <div className="row">
                <TextArea
                  label="Operace s textem"
                  dataIn={text}
                  handleData={handleData}
                  height="150"
                  id="t-area"
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <File
                    label="Načti text ze souboru"
                    handleData={handleData}
                    id="file"
                  />
                </div>
                <div className="col-6">
                  <Button
                    id="download"
                    label="Stáhni soubor s textem"
                    handleEvent={handleEvent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
