import { 
  MessageSquare, 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp,
  Heart,
  Target,
  Zap,
  CreditCard,
  Package,
  Stethoscope,
  LogIn,
  Star,
  LucideIcon
} from 'lucide-react'

/**
 * Maps intent to appropriate icon and color
 */
export function getIntentIcon(intent: string): {
  Icon: LucideIcon
  color: string
} {
  const intentLower = intent.toLowerCase()

  // Map database intent values
  if (intentLower.includes('app_performance') || intentLower.includes('performance')) {
    return { Icon: Zap, color: 'text-yellow-500' }
  }
  
  if (intentLower.includes('value_delivery') || intentLower.includes('delivery')) {
    return { Icon: Star, color: 'text-blue-500' }
  }
  
  if (intentLower.includes('feature_content') || intentLower.includes('content')) {
    return { Icon: Lightbulb, color: 'text-purple-500' }
  }
  
  if (intentLower.includes('login_latent') || intentLower.includes('login')) {
    return { Icon: LogIn, color: 'text-orange-500' }
  }
  
  if (intentLower.includes('payment_latent') || intentLower.includes('payment')) {
    return { Icon: CreditCard, color: 'text-green-500' }
  }
  
  if (intentLower.includes('poor_packaging') || intentLower.includes('packaging')) {
    return { Icon: Package, color: 'text-red-500' }
  }
  
  if (intentLower.includes('service_quality') || intentLower.includes('service')) {
    return { Icon: Stethoscope, color: 'text-cyan-500' }
  }

  // Fallback patterns
  if (intentLower.includes('complaint')) {
    return { Icon: AlertTriangle, color: 'text-red-600' }
  }
  
  if (intentLower.includes('suggestion')) {
    return { Icon: Lightbulb, color: 'text-yellow-600' }
  }
  
  if (intentLower.includes('appreciation')) {
    return { Icon: Heart, color: 'text-pink-600' }
  }
  
  if (intentLower.includes('competitor') || intentLower.includes('switching')) {
    return { Icon: TrendingUp, color: 'text-orange-600' }
  }
  
  if (intentLower.includes('market')) {
    return { Icon: Target, color: 'text-blue-600' }
  }

  return { Icon: MessageSquare, color: 'text-gray-500' }
}