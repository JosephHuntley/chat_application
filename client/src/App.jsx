import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { cookies } from 'universal-cookie';
import './App.css';

// Components
import { ChannelContainer, ChannelListContainer, Auth } from './components';

const apiKey = process.env.STREAM_API_KEY;
const authToken = false;

const client = StreamChat.getInstance(apiKey);

const App = () => {
	if (!authToken) return <Auth />;

	return (
		<div className='app__wrapper'>
			<Chat
				client={client}
				theme='team light'>
				<ChannelListContainer />
				<ChannelContainer />
			</Chat>
		</div>
	);
};

export default App;
