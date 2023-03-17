import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  membreForm!: FormGroup;
  @Input() personne: any;
  @Input() parentId: any;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.initForm();
    if (this.parentId) this.membreForm.patchValue({ parentId: this.parentId });
  }
  private initForm() {
    this.membreForm = new FormGroup({
      parentId: new FormControl(),
      name: new FormControl(),
      histoire: new FormControl(),
      surNom: new FormControl(''),
      dateNaissanceExacte: new FormControl(true),
      dateNaissance: new FormControl(''),
      mort: new FormControl(false),
      dateDecesExacte: new FormControl(true),
      dateDeces: new FormControl(''),
      sex: new FormControl('H'),
    });
  }

  ngOnChanges() {
    if (this.personne) this.refreshForm();
  }

  refreshForm() {
    this.membreForm.patchValue({
      ...this.personne,
    });
  }
  
  ajouter() {
    this.submitEvent.emit(this.membreForm.value);
    this.initForm();
    this.refreshForm();
  }
}
