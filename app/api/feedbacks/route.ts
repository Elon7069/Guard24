import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const feedbackId = searchParams.get('id')

    let query = supabase
      .from('feedbacks')
      .select(`
        *,
        reasons (
          *,
          reason_emotion_scores:emotion_scores (*),
          entities (*)
        ),
        provenance (*)
      `)

    // Filter by feedback ID if provided
    if (feedbackId) {
      query = query.eq('feedback_id', feedbackId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { feedbacks: [], total: 0 },
        { status: 200 }
      )
    }

    // Sort reasons and entities
    data.forEach((feedback: any) => {
      if (feedback.reasons) {
        feedback.reasons.sort((a: any, b: any) => a.reason_order - b.reason_order)
        
        feedback.reasons.forEach((reason: any) => {
          if (reason.entities) {
            reason.entities.sort((a: any, b: any) => a.entity_order - b.entity_order)
          }
        })
      }
    })

    return NextResponse.json({
      feedbacks: data,
      total: data.length
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
