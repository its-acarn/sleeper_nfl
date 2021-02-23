import { useState } from 'react';
import './App.css';

function App() {
	const [leagueID, setLeagueID] = useState('');
	const [leagueUsers, setLeagueUsers] = useState([]);
	const [leagueRosters, setLeagueRosters] = useState([]);

	async function fetchLeagueUsers() {
		try {
			const res = await fetch(
				`https://api.sleeper.app/v1/league/${leagueID}/users`
			);

			const data = await res.json();
			console.log(data);
			setLeagueUsers(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchLeagueRosters() {
		try {
			const res = await fetch(
				`https://api.sleeper.app/v1/league/${leagueID}/rosters`
			);

			const data = await res.json();
			console.log(data);
			setLeagueRosters(data);
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = (event) => {
		setLeagueID(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchLeagueUsers();
		fetchLeagueRosters();
	};

	return (
		<main className="App">
			<section>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={leagueID}
						onChange={handleChange}
					/>
					<input type="submit" value="Show League Users" />
				</form>
			</section>
			<section>
				<h1>League Users</h1>
				<div>
					{leagueUsers.map((item, i) => {
						return <p key={i}>{item.display_name}</p>;
					})}
				</div>
			</section>
			<section>
				<h1>League Rosters</h1>
				<div>
					{leagueRosters.map((item, i) => {
						return <p key={i}>{item.players}</p>;
					})}
				</div>
			</section>
		</main>
	);
}

export default App;
