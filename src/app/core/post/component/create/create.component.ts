import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  TitleStrategy,
} from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { finalize, first, mergeMap, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import { PostService } from 'src/app/core/services/post.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  btnvisibility: boolean = true;
  photodata = {};
  imageSource: string;
  isProcessing = false;
  form: FormGroup;
  route: ActivatedRoute | null | undefined;
  id: any;
  posts: any;
  url: any;
  postformlabel: string = 'Create Post';
  actionbtn: string = 'submit';
  imageUrl = '';
  isImageProcessing = false;

  constructor(
    public apiService: ApiService,
    private postService: PostService,
    private imageService:ImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      featured_media: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),

      status: 'publish',
    });
    this.imageSource = '';
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['postId'];
    if (this.id) {
      this.postformlabel = 'Edit Post';
      this.actionbtn = 'Update';

      this.postService
        .getSinglePostById(this.id)
        .pipe(first())
        .subscribe({
          next: (res: any) => {
            let imageId = res._embedded['wp:featuredmedia']['0'].id;
            this.imageUrl = res._embedded['wp:featuredmedia']['0'].source_url;
            this.form.patchValue({
              id: this.id,
              title: res.title.rendered,
              content: res.content.rendered,
              featured_media: imageId,
            });
          },
        });
    }
  }

  onFileUpload(ev: any): void {
    ev.stopPropagation();
    const file = ev.target.files[0];
    this.photodata = {
      file,
      title: 'post_pic',
    };
    this.isImageProcessing = true;
    this.uploadImage()
      .pipe(first())
      .subscribe((res:any) => {
        this.isImageProcessing = false;
        this.imageUrl = res.guid.rendered;
        this.form.patchValue({
          featured_media: res.id,
        });
      });
  }

  submit() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.postService
        .savePost(this.form.value, this.id)
        .pipe(first())
        .subscribe((res) => {
            this.isProcessing = false;
          this.router.navigateByUrl('/post/index');
        });
    }
  }

  uploadImage() {
    return this.imageService.uploadImage(this.photodata);
  }
  Back() {
    this.location.back();
  }
}
