const mongoose = require('mongoose')
const heroSchema = new mongoose.Schema({
  title: { type: String },
  name: { type: String },
  avatar: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  comment: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Skill' }],
  skillSuggestion: {
    major: { type: mongoose.SchemaTypes.ObjectId, ref: 'Skill' },
    minor: { type: mongoose.SchemaTypes.ObjectId, ref: 'Skill' },
    summonerSkills: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Skill' }],
  },
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  epigraph: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Epigraph' }],
  usageTips: { type: String },
  fightingTips: { type: String },
  teamTips: { type: String },
  partner: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
  controller: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
  restrainer: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }]
}, {
  timestamps: true,
})

module.exports = mongoose.model('Hero', heroSchema, 'heroes')