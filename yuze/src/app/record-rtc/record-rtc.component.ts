import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
// const RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRTCComponent implements AfterViewInit {

  private stream: MediaStream;
  private recordRTC: any;

  // @ViewChild('video') video;

  constructor() {
    // Do stuff
  }

  ngAfterViewInit() {
    // // set the initial state of the video
    // const video: HTMLVideoElement = this.video.nativeElement;
    // video.muted = false;
    // video.controls = true;
    // video.autoplay = false;
    //
    //  TODO: start recording as soon as the page load
    this.startRecording();
    // wait 5 seconds, stop recording
    setTimeout(() => this.stopRecording(), 10000);
  }

  // toggleControls() {
  //   const video: HTMLVideoElement = this.video.nativeElement;
  //   video.muted = !video.muted;
  //   video.controls = !video.controls;
  //   video.autoplay = !video.autoplay;
  // }

  successCallback(stream: MediaStream) {

    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    //
    // const video: HTMLVideoElement = this.video.nativeElement;
    // video.src = window.URL.createObjectURL(stream);
    // this.toggleControls();
  }

  errorCallback() {
    // handle error here
  }

  processVideo(audioVideoWebMURL) {
    // const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    // video.src = audioVideoWebMURL;
    // this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    const mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: false
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }
}
