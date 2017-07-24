import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: null,
			playing: false,
			volume: 0.8,
			played: 0,
			duration: 0,
			youtubeConfig: {modestbranding: 0, enablejsapi: 1, showinfo: 0},
            seeking: false,
            openControls: true
		}
    }
    
    playPause = () => {
        this.setState({ 
            playing: !this.state.playing
        });
    }
    setVolume = ev => {
        this.setState({ volume: parseFloat(ev.target.value) });
    }
    onSeekMouseDown = e => {
        this.setState({ seeking: true });
    }
    onSeekChange = ev => {
        this.setState({ played: parseFloat(ev.target.value) });
    }
    onSeekMouseUp = ev => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(ev.target.value));
    }
    onProgress = state => {
        if (!this.state.seeking) {
            this.setState(state);
        }
    }
    
    render() {
        const { url, playing, volume, played, duration, youtubeConfig, openControls } = this.state;
        const volumeBtnIcon = (
            volume == 0 ? 'mute volume-btn'
            : volume >= 0.5 ? 'loud volume-btn' : 'volume-btn');
        return (
            <div
                className='video-wrapper'
                onMouseOver={() => this.setState({ openControls: true })}
                onMouseOut={
                    () => (!playing ? this.setState({ openControls: true })
                    : this.setState({ openControls: false }))}
            >
                <ReactPlayer
                    ref={player => { this.player = player }}
                    className='video-player'
                    url={this.props.videoUrl}
                    playing={playing}
                    volume={volume}
                    width='100%'
                    height='100%'
                    youtubeConfig={youtubeConfig}
                    onPlay={() => this.setState({ playing: true })}
                    onPause={() => this.setState({ playing: false })}
                    onEnded={() => this.setState({ playing: false })}
                    onProgress={this.onProgress}
                    onDuration={duration => this.setState({ duration })}
                />
                <div className={openControls ? 'open video-controls' : 'video-controls'}>
                    <button className={playing ? 'play-btn pause' : 'play-btn'} onClick={this.playPause} />
                    <button className={volumeBtnIcon} >
                        <input 
                            className='volume-slider' type='range' min={0} max={1} step='any'
                            value={volume} onChange={this.setVolume}
                        />
                    </button>
                    <input
                        className='progress-slider' type='range' min={0} max={1} step='any'
                        value={played}
                        onMouseDown={this.onSeekMouseDown}
                        onChange={this.onSeekChange}
                        onMouseUp={this.onSeekMouseUp}
                    />    
                    <Duration className='remaining-time' seconds={duration * (1 - played)} />
                </div>
            </div>
        );
    }
}

const Duration = ({className, seconds}) => {
    const format = seconds => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = pad(date.getUTCSeconds());
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    }
    const pad = string => {
        return ('0' + string).slice(-2);
    }
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={className} >
            -{format(seconds)}
        </time>
    );
}

export default VideoPlayer;