import React, { useEffect, useContext } from "react";
//import { useHistory } from "react-router-dom";
import GameFinder from "../APIs/GameFinder";
import { GamesContext } from "../context/GamesContext";
import { Chart } from "react-google-charts";
import "./GamesList.css";


const GamesList = (props) => {
    const {games, setGames} = useContext(GamesContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                //gets game data sent from the front end after the query
                const response = await GameFinder.get("/list")
                setGames(response.data.data.games)
                console.log(response)
            } catch(err) {

            }
        }
            fetchData() 
    }, [])  
    
    

    
    
      const options1 = {
        title: "Does Over or Under Win?",
      };

      const options2 = {
        title: "Does Favored Team Cover Spread?",
      };
      var over = 0;
      var under = 0;
      var neither1 = 0;
      games.forEach(function(game) {
        if (game.over_under_line != null) {
            if (game.score_away + game.score_home > game.over_under_line) {
                over = over + 1;
            } else if (game.score_away + game.score_home < game.over_under_line) {
                under = under + 1;
            } else {
                neither1 = neither1 + 1;
            }
        }
        
    });

    const OverUnderData = [
        ["Option", "Number"],
        ["Over", over],
        ["Under", under],
        ["Neither", neither1],
      ];

      var favored = 0;
      var underdog = 0;
      var neither2 = 0;
      games.forEach(function(game) {
        var favoredID = game.team_favorite_id;
        var homeID = identifyIDs(game.team_home)
        var difference = 0;
        if (favoredID == homeID) {
            difference = game.score_home - game.score_away
        } else {
            difference = game.score_away - game.score_home
        }
        if (game.spread_favorite != null && game.spread_favorite != 'PICK') {
            if (difference > -1 * game.spread_favorite) {
                favored = favored + 1
            } else if (difference < -1 * game.spread_favorite) {
                underdog = underdog + 1
            } else {
                neither2 = neither2 + 1;
            }
        }

       
    

        
    });
    const spreadData = [
        ["Option", "Number"],
        ["Favored", favored],
        ["Underdog", underdog],
        ["Neither", neither2],
      ];
       
    //grabs desired values from the game data which we want to display
    return (
        <>
        
        <>
        
        </>
<div>
        <div className="left-chart">
        <Chart
      chartType="PieChart"
      data={OverUnderData}
      options={options1}
      width={"90%"}
      height={"400px"}
    />
        </div>

        <div className="right-chart">
        <Chart
      chartType="PieChart"
      data={spreadData}
      options={options2}
      width={"90%"}
      height={"400px"}
    />
        </div>
        </div>
        
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        
    
        <div className='list-group'>
            <table className= "table table-hover table-dark">
            <thead>
          <tr className="bg-primary">
            <th scope="col">Date</th>
            <th scope="col">Week</th>
            <th scope="col">Season</th>
            <th scope="col">Home Team</th>
            <th scope="col">Home Score</th>
            <th scope="col">Away Score</th>
            <th scope="col">Away Team</th>
            <th scope="col">Point Spread</th>
            <th scope="col">Over/Under</th>
          </tr>
        </thead>
        <tbody>
            {games && games.map(game => {
 
                return (

                    
                    <tr>
                    <td>{game.schedule_date} </td>
                    <td>{game.schedule_week}</td>
                    <td>{game.schedule_season}</td>
                    <td>{game.team_home}</td>
                    <td>{game.score_home}</td>
                    <td>{game.score_away}</td>
                    <td>{game.team_away}</td>
                    <td>{game.team_favorite_id} {game.spread_favorite}</td>
                    <td>{game.over_under_line}</td>
                </tr>
                )
            })}
        </tbody>
            </table>
        </div>
        </>
    )
}


//given a current team, return all of the team names in that franchise's history
function identifyIDs(team) {
    if (team == 'Arizona Cardinals') {
        return "ARI"
    }
    if (team == 'Atlanta Falcons') {
        return "ATL"
    }
    if (team == 'Baltimore Ravens') {
        return "BAL"
    }
    if (team == 'Buffalo Bills') {
        return "BUF"
    }
    if (team == 'Carolina Panthers') {
        return "CAR"
    }
    if (team == 'Chicago Bears') {
        return "CHI"
    }
    if (team == 'Cincinnati Bengals') {
        return "CIN"
    }
    if (team == 'Cleveland Browns') {
        return "CLE"
    }
    if (team == 'Dallas Cowboys') {
        return "DAL"
    }
    if (team == 'Denver Broncos') {
        return "DEN"
    }
    if (team == 'Detriot Lions') {
        return "DET"
    }
    if (team == 'Green Bay Packers') {
        return "GB"
    }
    if (team == 'Houston Texans') {
        return "HOU"
    }
    if (team == 'Indianapolis Colts') {
        return "IND"
    }
    if (team == 'Jacksonville Jaguars') {
        return "JAX"
    }
    if (team == 'Kansas City Chiefs') {
        return "KC"
    }
    if (team == 'Las Vegas Raiders') {
        return "LVR"
    }
    if (team == 'Los Angeles Chargers') {
        return "LAC"
    }
    if (team == 'Los Angeles Rams') {
        return "LAR"
    }
    if (team == 'Miami Dolphins') {
        return "MIA"
    }
    if (team == 'Minnesota Vikings') {
        return "MIN"
    }
    if (team == 'New England Patriots') {
        return "NE"
    }
    if (team == 'New Orleans Saints') {
        return "NO"
    }
    if (team == 'New York Giants') {
        return "NYG"
    }
    if (team == 'New York Jets') {
        return "NYJ"
    }
    if (team == 'Philadelphia Eagles') {
        return "PHI"
    }
    if (team == 'Pittsburgh Steelers') {
        return "PIT"
    }
    if (team == 'San Francisco 49ers') {
        return "SF"
    }
    if (team == 'Seattle Seahawks') {
        return "SEA"
    }
    if (team == 'Tampa Bay Buccaneers') {
        return "TB"
    }
    if (team == 'Houston Texas') {
        return "HOU"
    }
    if (team == 'Tennessee Titans') {
        return "TEN"
    }
    if (team == 'Boston Patriots') {
        return "NE"
    }
    if (team == 'Houston Oilers') {
        return "TEN"
    }
    if (team == 'Baltimore Colts') {
        return "IND"
    }
    if (team == 'Los Angeles Raiders') {
        return "LVR"
    }
    if (team == 'Oakland Raiders') {
        return "HOU"
    }
    if (team == 'Phoenix Cardinals') {
        return "ARI"
    }
    if (team == 'St. Louis Cardinals') {
        return "ARI"
    }
    if (team == 'Tennessee Oilers') {
        return "TEN"
    }
    if (team == 'Washington Football Team') {
        return "WAS"
    }
    if (team == 'Washington Redskins') {
        return "WAS"
    }
    if (team == 'St. Louis Rams') {
        return "LAR"
    }
    if (team == 'Washington Commanders') {
        return "WAS"
    }
 
}

export default GamesList
