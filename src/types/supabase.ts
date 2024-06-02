export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          category_name: string | null
          created_at: string
          event_id: string | null
          id: string
        }
        Insert: {
          category_name?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
        }
        Update: {
          category_name?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string
          id: string
          img_url: string | null
          is_completed: boolean
          name: string
          schedules: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          img_url?: string | null
          is_completed?: boolean
          name: string
          schedules?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          img_url?: string | null
          is_completed?: boolean
          name?: string
          schedules?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      nomination_period: {
        Row: {
          created_at: string
          end_date: string | null
          event_id: string | null
          id: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          event_id?: string | null
          id?: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          event_id?: string | null
          id?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nomination_period_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      nominations: {
        Row: {
          category_id: string | null
          created_at: string
          email: string | null
          event_id: string | null
          full_name: string | null
          id: string
          phone: string | null
          reasons: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          email?: string | null
          event_id?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          reasons?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          email?: string | null
          event_id?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          reasons?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nominations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      nominees: {
        Row: {
          category: string | null
          code: string | null
          created_at: string
          event_id: string | null
          full_name: string | null
          id: string
          img_url: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          code?: string | null
          created_at?: string
          event_id?: string | null
          full_name?: string | null
          id?: string
          img_url?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          code?: string | null
          created_at?: string
          event_id?: string | null
          full_name?: string | null
          id?: string
          img_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          end_date: string
          event_id: string
          id: number
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          event_id: string
          id?: number
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          event_id?: string
          id?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      voting: {
        Row: {
          count: number | null
          created_at: string
          id: string
          nominee_id: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string
          id?: string
          nominee_id?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string
          id?: string
          nominee_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voting_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "nominees"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_period: {
        Row: {
          created_at: string
          end_date: string | null
          event_id: string | null
          id: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          event_id?: string | null
          id?: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          event_id?: string | null
          id?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voting_period_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string | null
          id: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          account_number: string | null
          amount: string | null
          bank_name: string | null
          channel: string | null
          created_at: string
          event_id: string | null
          id: string
          network_provider: string | null
          phone_number: string | null
        }
        Insert: {
          account_number?: string | null
          amount?: string | null
          bank_name?: string | null
          channel?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          network_provider?: string | null
          phone_number?: string | null
        }
        Update: {
          account_number?: string | null
          amount?: string | null
          bank_name?: string | null
          channel?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          network_provider?: string | null
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
