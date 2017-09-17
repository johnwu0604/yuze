import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { RecordRtcService } from './record-rtc.service';



@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss'],
  providers: [RecordRtcService]
})
export class RecordRTCComponent implements AfterViewInit {
  private stream: MediaStream;
  private recordRTC: any;

  constructor(public recordRTCService: RecordRtcService) { }

  ngAfterViewInit() {
    // start recording as soon as the page load
    this.startRecording();
    // wait 5 seconds, stop recording
    setTimeout(() => this.stopRecording(), 11000);
  }

  successCallback(stream: MediaStream) {
    const options = {
      mimeType: 'video/webm',
      bitsPerSecond: 500000
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
  }

  errorCallback() {
    // handle error here
  }

  processVideo(audioVideoWebMURL) {
    const recordRTC = this.recordRTC;
    const recordedBlob = recordRTC.getBlob();
    const file = new File([recordedBlob], 'filename.webm', {
      type: 'video/webm'});

    // http request
    const formData: FormData = new FormData();
    formData.append('video', file, file.name);
    this.saveVideo(formData);
    recordRTC.getDataURL(function (dataURL) { });
  }

  saveVideo(data){
    this.recordRTCService.saveVideo(data).then((res) => {
      console.log(res);
    })
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
