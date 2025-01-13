import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {

  }

  slides = [
    { img: "assets/carousel/bolsa_1.png" },
    { img: "assets/carousel/bolsa_2.png" },
    { img: "assets/carousel/bolsa_3.png" },
    { img: "assets/carousel/bolsa_4.png" },
    { img: "assets/carousel/bolsa_5.png" },
    { img: "assets/carousel/bolsa_6.png" },
  ];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToscroll": true
        }
      }
    ]
  }

};

