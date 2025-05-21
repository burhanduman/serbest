// src/PuanlamaApp.jsx
import { useState, useEffect } from "react";
import { db } from "./lib/firebase";
import { ref, set, get, child } from "firebase/database";
import React from 'react';

const teams = [
  "ELEKTRONİKÇİLER", "DYNAMIC REAPER", "SIZINTI AVCILARI", "STAR", "NS TECH",
  "LEİBNİZ", "MİCROSKETCHER", "NEBULA", "ALONE", "ROBOCODE246", "THE PERFECT",
  "STORMCLOAKS", "SKYBEK", "AUTONOMA", "BİNGO", "AUTONOMA 2", "PARS",
  "SONS OF A AI", "TEKNİK GRUP", "ANKA", "BEYAZ YILDIZ", "Z1"
];

const criteria = ["Yaratıcılık", "Teknik Yeterlilik", "Sunum ve Anlatım", "Kullanılabilirlik", "Özgünlük"];

export default function PuanlamaApp() {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const fetchScores = async () => {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "scores"));
      if (snapshot.exists()) {
        setScores(snapshot.val());
      }
    };
    fetchScores();
  }, []);

  const handleChange = async (team, criterion, value) => {
    const updated = {
      ...(scores[team] || {}),
      [criterion]: Number(value),
    };
    setScores((prev) => ({
      ...prev,
      [team]: updated,
    }));
    await set(ref(db, `scores/${team}`), updated);
  };

  const calculateAverage = (team) => {
    const values = Object.values(scores[team] || {});
    const sum = values.reduce((a, b) => a + b, 0);
    return values.length ? (sum / criteria.length).toFixed(2) : "-";
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {teams.map((team) => (
        <div key={team} className="border p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-2">{team}</h2>
          {criteria.map((criterion) => (
            <div key={criterion} className="mb-2">
              <label>{criterion}</label>
              <input
                type="number"
                min={0}
                max={20}
                value={scores[team]?.[criterion] || ""}
                onChange={(e) => handleChange(team, criterion, e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ))}
          <div className="mt-2 font-semibold">
            Ortalama: {calculateAverage(team)} / 20
          </div>
        </div>
      ))}
    </div>
  );
}

             