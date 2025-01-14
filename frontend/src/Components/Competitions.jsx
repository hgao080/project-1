import { useState, useContext } from "react";

import Competition from "./Competition";
import competitionsService from "../services/competitions";

import { DataContext } from "../pages/Admin";

const Competitions = () => {
  const { competitions, setCompetitions } = useContext(DataContext);
  const [title, setTitle] = useState("");

  const createCompetition = (e) => {
    e.preventDefault();

    const competitionObject = {
      title,
      quesitonIds: [],
    };

    competitionsService
      .createCompetition(competitionObject)
      .then((createdCompetition) => {
        setCompetitions(competitions.concat(createdCompetition));
        setTitle("");
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl underline font-main decoration-2 font-bold text-warm-brown underline-offset-4 tracking-wide">
        Competitions
      </h2>
      <div className="self-start text-2xl font-bold font-body mt-2">
        <form onSubmit={createCompetition} className="flex gap-2">
          <label htmlFor="" className="tracking-wide">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black rounded font-body pl-1 text-2xl font-light"
          />
          <button className="font-body text-xl border border-black rounded bg-pastel-green px-4 transition-all hover:translate-y-[-2px] active:translate-y-[2px]">
            Create
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-3 mt-[0.75rem] border border-black rounded-xl overflow-auto w-[50rem] p-4 scrollbar-none h-[16rem] bg-beige shadow-2xl">
        {competitions.map((competition) => (
          <Competition
            key={competition.title}
            competitions={competitions}
            competition={competition}
            setCompetitions={setCompetitions}
          />
        ))}
      </div>
    </div>
  );
};

export default Competitions;
