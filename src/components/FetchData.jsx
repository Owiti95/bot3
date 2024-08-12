import React, {useState, useEffect} from 'react'
import axios from 'axios';
import BotRow from './BotRow';
import YourBotArmy from './YourBotArmy';
import Table from './Table';

function FetchData() {
    const [data, setData] = useState([])
    const [selectedBots, setSelectedBots] = useState([]);

    useEffect(() => {
        axios.get('https://bot-inky-theta-38.vercel.app/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleAddClick = (bot) => {
        if (!selectedBots.some(selected => selected.id === bot.id)){
            setSelectedBots([...selectedBots, bot]);
            console.log('added bot', bot);
        }
    };

    const handleRemoveClick = (botId) => {
        setSelectedBots(selectedBots.filter(bot => bot.id !== botId));
        console.log('removed bot with id:', botId);
    };

    const handleDeleteClick = (botId) => {
        axios.delete(`https://bot-inky-theta-38.vercel.app/${botId}`)
        .then(() => {
            setData(data.filter(bot => bot.id !== botId));
            setSelectedBots(selectedBots.filter(bot => bot.id !== botId));
        })
        .catch(err => console.log('Failed to delete bot:', err));
    };
    
    const botHeaders = ['id', 'name', 'health', 'damage', 'armor', 'bot_class', 'avatar_url', 'actions'];
    const selectedBotHeaders = botHeaders;

    const botRows = data.map(bot => (
        <BotRow
        key={bot.id}
        bot={bot}
        onAddClick={handleAddClick}
        onDeleteClick={handleDeleteClick}/>
    ));
    const selectedBotRows = selectedBots.map(bot => (
        <YourBotArmy
        key={bot.id}
        bot={bot}
        onRemoveClick={handleRemoveClick}/>
    ));
  return (
    <div className='container'>
        <div>
            <h2 className='bots-collection'>Bots Collection</h2>
            <div className='table-container'>
            <Table headers={botHeaders} rows={botRows}/>

            {selectedBots.length > 0 && (
            <div>
                <h2 className='my-army'>My Army</h2>
                <Table headers={selectedBotHeaders} rows={selectedBotRows} />
                </div>
            )}
            </div>
        </div>
    </div>
  );
}

export default FetchData;