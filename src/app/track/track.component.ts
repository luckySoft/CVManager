import { Component, OnInit, Sanitizer } from '@angular/core';
import { Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit{

  private YT: any;
  private videoUrl;
  @Input() private video;
  @Input() private width;
  @Input() private height;
  @Input() private start: boolean = true;
  private player: any;

  constructor(protected sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/' + this.video + '?enablejsapi=1&origin=http://example.com');
    this.initVideoPlayer();
  }
  initVideoPlayer() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.player = new window['YT'].Player('youtube-container', {
        videoId: this.video,
        width: this.width,
        height: this.height,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this)
        }
      });
    };
  }

  onPlayerReady(event) {
    document.getElementById('youtube-container').style.borderColor = '#ffffff';
    if (this.start == true) {
      event.target.playVideo();
    }
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (event.target.getDuration() - event.target.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('error loading: ' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}