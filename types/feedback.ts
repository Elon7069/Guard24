// Core feedback types matching our database schema

export interface Feedback {
    id: string
    feedback_id: string
    clean_text: string
    clean_text_confidence: number
    one_liner_summary: string | null
    one_liner_summary_confidence: number
    feedback_language: string
    feedback_language_confidence: number
    created_at: string
    updated_at: string
  }
  
  export interface Reason {
    id: string
    feedback_id: string
    extracted_reason_text: string
    reason_label: string | null
    reason_label_confidence: number
    extraction_method: string
    theme_label: string
    theme_confidence: number
    reason_sentiment_score: number
    reason_sentiment_score_confidence: number
    reason_intent: string
    reason_intent_confidence: number
    reason_evidence_snippets: string[]
    reason_evidence_snippets_confidence: number
    reason_suggested_action: string | null
    reason_order: number
    created_at: string
  }
  
  export interface EmotionScores {
    id: string
    reason_id: string
    anger: number
    frustration: number
    sadness: number
    joy: number
    sarcasm: number
    emotion_confidence: number
    created_at: string
  }
  
  export interface Entity {
    id: string
    reason_id: string
    extracted_entity_text: string
    canonical_entity_label: string
    entity_label_confidence: number
    entity_category: string
    entity_category_confidence: number
    extraction_method: string
    entity_order: number
    created_at: string
  }
  
  export interface Provenance {
    id: string
    feedback_id: string
    human_review_needed: boolean
    trigger_reasons: string[]
    created_at: string
  }
  
  // Combined types for the frontend (matching the JSON structure from assignment)
  export interface ReasonWithRelations extends Reason {
    reason_emotion_scores: EmotionScores
    entities: Entity[]
  }
  
  export interface FeedbackWithRelations extends Feedback {
    reasons: ReasonWithRelations[]
    provenance: Provenance
  }
  
  // UI Helper Types
  export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unknown'
  
  export type SentimentType = 'positive' | 'neutral' | 'negative'
  
  export interface EmotionData {
    name: string
    value: number
    color: string
  }