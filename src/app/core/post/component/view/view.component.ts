import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ImageService } from 'src/app/core/services/image.service';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id!: any;
  singlePost: any;

  FormData: any;
  form: any;
  imageSource = '';

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private imageService:ImageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('postId') as string;
    console.log(this.id);
    console.log('hererer');

    this.getSinglePost();
  }

  getSinglePost() {
    this.postService
      .getSinglePostById(this.id)
      .pipe(
        mergeMap((res) => {
          this.singlePost = res;
          return this.imageService.getImageById(res.featured_media);
        })
      )
      .subscribe((data: any) => {
        console.log(data);

        this.imageSource = data.guid.rendered;
        console.log('single post', data);
      });
  }

  edit() {
    console.log('edit triggered');

    this.router.navigateByUrl('post/edit/' + this.id);
  }

  delete(singlePost: any) {
    this.route.snapshot.paramMap.get('id');
    this.postService.delete(this.id).subscribe((res) => {
      console.log('Deleted Post' + this.id);
      this.router.navigate(['post/index']);
    });
  }
}
