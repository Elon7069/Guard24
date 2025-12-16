import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const feedbackId = searchParams.get('id')

    // If no ID provided, get a random feedback
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

    if (feedbackId) {
      query = query.eq('feedback_id', feedbackId)
    } else {
      // Get random feedback - first get all IDs, then pick one
      const { data: allFeedbacks, error: listError } = await supabase
        .from('feedbacks')
        .select('feedback_id')
      
      if (listError || !allFeedbacks || allFeedbacks.length === 0) {
        return NextResponse.json(
          { error: 'No feedbacks found' },
          { status: 404 }
        )
      }

      const randomIndex = Math.floor(Math.random() * allFeedbacks.length)
      const randomId = allFeedbacks[randomIndex].feedback_id
      query = query.eq('feedback_id', randomId)
    }

    const { data, error } = await query.single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      )
    }

    // Sort reasons by order
    if (data.reasons) {
      data.reasons.sort((a: any, b: any) => a.reason_order - b.reason_order)
      
      // Sort entities within each reason
      data.reasons.forEach((reason: any) => {
        if (reason.entities) {
          reason.entities.sort((a: any, b: any) => a.entity_order - b.entity_order)
        }
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}