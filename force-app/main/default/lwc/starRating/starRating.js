import { LightningElement, api, track } from 'lwc'

export default class StarRating extends LightningElement {
  @track score = 0
  @track maxScore = 5
  @track stars = []
  @api readOnly = false
  @api activeColor = '#ffd055'
  @api inactiveColor = '#d8d8d8'

  @api
  get rating() { return this.score }

  set rating(value) {
    this.score = value
    this.generateStars()
  }

  @api
  get maxRating() {
    return this.maxScore
  }

  set maxRating(value) {
    this.maxScore = Number(value)
  }

  generateStars() {
    this.stars = []
    for (let i = 1; i < this.maxRating + 1; i++) {
      const isActive = (i <= this.score)
      const star = {
        id: i,
        isActive
      }
      this.stars.push(star)
    }
  }

  starClicked(event) {
    const clickedStar = event.detail
    this.rating = clickedStar
    this.ratingChanged()
  }

  ratingChanged() {
    const value = new CustomEvent('value', { detail: this.score })
    this.dispatchEvent(value)
  }

  connectedCallback() {
    this.generateStars()
  }
}
