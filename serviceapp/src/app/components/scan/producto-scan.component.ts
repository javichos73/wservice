import {ViewChild, ViewChildren, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-producto-scan',
  templateUrl: './producto-scan.component.html',
  // styleUrls: ['./producto-scan.component.css']
})
export class ProductoScanComponent implements OnInit {
  streamer: any = '';
  a = [];
  @ViewChild('hardwareVideo') hardwareVideo: any;
  camara: any = {};
  iniciado = false;
  urlVideo = '';

  constructor() {
  }

  ngOnInit() {
    const n = <any>navigator;
    n.mediaDevices.enumerateDevices().then(e => {
      for (const sourceInfo of e) {
        if (sourceInfo.kind === 'videoinput') {
          this.a.push({
            id: sourceInfo.deviceId,
            label: sourceInfo.label || 'camera'
          });
        }
      }
      this.camara = this.a.length > 0 ? this.a[0] : '';
    });
  }

  cambiarCamara(cam) {
    console.log('cambio' + cam.label);
    this.camara = cam;
    if (this.iniciado) this.videoStart();
  }

  videoStop() {
    this.iniciado = false;
    this.hardwareVideo.nativeElement.src = '';
    this.streamer.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  videoStart() {
    const video = this.hardwareVideo.nativeElement;
    if (this.iniciado) {
      this.videoStop();
    }

    // inicio siguiente

    const n = <any>navigator;
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );
    console.log('se va a iniciar la camara:' + this.camara);
    n.mediaDevices.getUserMedia({video: {optional: [{sourceId: this.camara.id}]}}
    ).then(stream => {
      this.streamer = stream;
      video.src = window.URL.createObjectURL(stream);
      // video.play();
    });
    this.iniciado = true;

  }

  gotSources(sourceInfos) {
    /*const audioSelect = this.audioSource.nativeElement;

     n.mediaDevices.getUserMedia({video: {optional: [{sourceId: this.camara}]}}
     ).then(function (stream) {
     this.streamer = stream;
     video.src = window.URL.createObjectURL(stream);
     video.play();
     });


     const videoSelect = this.videoSource.nativeElement
     for (let sourceInfo of sourceInfos) {
     option.value = sourceInfo.deviceId;
     const option = tcreateElement('option');
     if (sourceInfo.kind === 'audiooutput') {
     option.text = sourceInfo.label || 'microphone ' +
     (audioSelect.length + 1);
     audioSelect.createEl
     audioSelect.appendChild(option);
     } else if (sourceInfo.kind === 'videoinput') {
     option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
     videoSelect.appendChild(option);
     } else {
     console.log('Some other kind of source: ', sourceInfo);
     }
     }
     */
  }


  //  METODO PARA USAR BARCODESCANER....?

  getScan() {
    let href = window.location.href;
    let ptr = href.lastIndexOf("/producto-scan");
    if (ptr > 0) {
      href = href.substr(0, ptr);
    }

    console.log(href);
    // window.addEventListener("storage", onbarcode, false);
    // setTimeout('window.removeEventListener("storage", onbarcode, false)', 15000);
    // localStorage.removeItem("barcode");
    //window.open  (href + "#zx" + new Date().toString());

    if (navigator.userAgent.match(/Firefox/i)) {
      //Used for Firefox. If Chrome uses this, it raises the "hashchanged" event only.
      window.location.href = ("zxing://scan/?ret=" + encodeURIComponent(href + "/producto-detail/{CODE}"));
    } else {
      //Used for Chrome. If Firefox uses this, it leaves the scan window open.
      window.open("zxing://scan/?ret=" + encodeURIComponent(href + "/producto-detail/{CODE}"));
    }
  }


}
