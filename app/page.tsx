"use client"
import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Medal } from 'lucide-react';
import Image from "next/image";
import logo from "@/app/public/logo.png"
import Link from 'next/link';
interface Team {
  id: string;
  name: string;
  code: string;
  score: number;
}

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeam, setNewTeam] = useState<Omit<Team, 'id'>>({
    name: '',
    code: '',
    score: 0
  });

  const addTeam = () => {
    if (!newTeam.name || !newTeam.code) return;
    
    setTeams([
      ...teams,
      {
        id: crypto.randomUUID(),
        ...newTeam
      }
    ]);
    
    setNewTeam({ name: '', code: '', score: 0 });
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const updateScore = (id: string, newScore: number) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, score: newScore } : team
    ));
  };

  const getRankStyle = (index: number) => {
    switch(index) {
      case 0: // Gold
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 1: // Silver
        return "bg-gray-100 text-gray-800 border-gray-300";
      case 2: // Bronze
        return "bg-orange-100 text-orange-800 border-orange-300";
      default: // Normal
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href={`https://gdg.community.dev/gdg-on-campus-raghu-engineering-college-visakhapatnam-india/`}>
         <Image src={logo} width={200} height={200}  alt='logo'/>
         </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Team Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Team Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Team Code"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTeam.code}
              onChange={(e) => setNewTeam({ ...newTeam, code: e.target.value })}
            />
            <input
              type="number"
              placeholder="Score"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTeam.score}
              onChange={(e) => setNewTeam({ ...newTeam, score: Number(e.target.value) })}
            />
            <button
              onClick={addTeam}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Team
            </button>
          </div>
        </div>

        {/* Teams List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Teams</h2>
          <div className="space-y-4">
            {teams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Medal className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No teams added yet. Add your first team above!</p>
              </div>
            ) : (
              teams.sort((a, b) => b.score - a.score).map((team, index) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold ${getRankStyle(index)}`}>
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">{team.code}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{team.name}</h3>
                      <p className="text-sm text-gray-500">Code: {team.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateScore(team.id, Math.max(0, team.score - 1))}
                        className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 font-semibold">
                        {team.score}
                      </span>
                      <button
                        onClick={() => updateScore(team.id, team.score + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => deleteTeam(team.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
