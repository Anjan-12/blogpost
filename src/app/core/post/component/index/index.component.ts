import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  blogPosts: any;
  errorMessage: any;
  searchItem = '';

  @Input() n: number = 0;
  @Output() postEmitter = new EventEmitter<number[]>();

  constructor(
    private apiService: ApiService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.blogPosts = data;
      },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }
  onSearch(event: any) {
    this.searchItem = event.target.value;
    console.log(this.searchItem);
    this.postService
      .searchInPosts(`?search=${this.searchItem}`)
      .subscribe((res) => {
        this.n = res.length;
        this.postEmitter.emit(res);
      });
  }
}
