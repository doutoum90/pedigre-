import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
})
export class AddMemberComponent implements OnInit {
  membreForm!: FormGroup;
  @Input() personne: any;
  @Input() sibling = false;
  @Input() peres: any;
  @Input() meres: any;
  @Input() edit: any = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() submitAndLeaveEvent: EventEmitter<any> = new EventEmitter();
  @Output() exitEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.membreForm = new FormGroup({
      name: new FormControl(),
      histoire: new FormControl(),
      surNom: new FormControl(''),
      dateNaissanceExacte: new FormControl(true),
      dateNaissance: new FormControl(''),
      mort: new FormControl(false),
      dateDecesExacte: new FormControl(true),
      dateDeces: new FormControl(''),
      motherId: new FormControl(''),
      fatherId: new FormControl(''),
      sex: new FormControl('H'),
    });
  }

  ngOnChanges() {
    if (this.personne && this.edit) this.refreshForm();
  }

  refreshForm() {
    if (this.personne) {
      if (this.personne._id && this.personne.sex === 'F')
        this.membreForm.patchValue({
          ...this.personne,
          fatherId: null,
          motherId: this.personne.id,
        });
      if (this.personne._id && this.personne.sex === 'H')
        this.membreForm.patchValue({
          ...this.personne,
          motherId: null,
          fatherId: this.personne.id,
        });
    }
  }

  process() {
    this.submitEvent.emit(this.membreForm.value);
    this.initForm();
    this.refreshForm();
  }
  processAndLeave() {
    this.submitAndLeaveEvent.emit(this.membreForm.value);
  }

  leave() {
    this.exitEvent.emit();
  }
}
