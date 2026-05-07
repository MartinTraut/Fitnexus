// AUTO-GENERATED via Supabase MCP (generate_typescript_types).
// Bei Schema-Aenderung neu generieren — nicht von Hand editieren.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at: string
          diff: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          diff?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          diff?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          customer_id: string
          duration_minutes: number | null
          id: string
          meeting_url: string | null
          notes: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["booking_status"]
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      chat_threads: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          last_message_at: string | null
          trainer_id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          last_message_at?: string | null
          trainer_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          last_message_at?: string | null
          trainer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_threads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_threads_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          monthly_price_cents: number
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trainer_id: string
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          monthly_price_cents?: number
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trainer_id: string
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          monthly_price_cents?: number
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_subscriptions_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          created_at: string
          customer_id: string
          end_date: string | null
          id: string
          monthly_rate: number
          package_id: string | null
          platform_fee_percent: number
          sessions_total: number | null
          sessions_used: number | null
          start_date: string
          status: Database["public"]["Enums"]["contract_status"]
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          end_date?: string | null
          id?: string
          monthly_rate?: number
          package_id?: string | null
          platform_fee_percent?: number
          sessions_total?: number | null
          sessions_used?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"]
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          end_date?: string | null
          id?: string
          monthly_rate?: number
          package_id?: string | null
          platform_fee_percent?: number
          sessions_total?: number | null
          sessions_used?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "trainer_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          first_name: string | null
          fitness_goals: string[] | null
          id: string
          is_anonymous: boolean | null
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          first_name?: string | null
          fitness_goals?: string[] | null
          id?: string
          is_anonymous?: boolean | null
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          first_name?: string | null
          fitness_goals?: string[] | null
          id?: string
          is_anonymous?: boolean | null
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_monthly: number | null
          converted_contract_id: string | null
          created_at: string
          customer_id: string
          goals: string[] | null
          id: string
          message: string | null
          preferred_modes: string[] | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          trainer_id: string
          updated_at: string
        }
        Insert: {
          budget_monthly?: number | null
          converted_contract_id?: string | null
          created_at?: string
          customer_id: string
          goals?: string[] | null
          id?: string
          message?: string | null
          preferred_modes?: string[] | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          trainer_id: string
          updated_at?: string
        }
        Update: {
          budget_monthly?: number | null
          converted_contract_id?: string | null
          created_at?: string
          customer_id?: string
          goals?: string[] | null
          id?: string
          message?: string | null
          preferred_modes?: string[] | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_converted_contract_id_fkey"
            columns: ["converted_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_logs: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          meals: Json
          notes: string | null
          recorded_at: string
          updated_at: string
          water_ml: number | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          meals?: Json
          notes?: string | null
          recorded_at?: string
          updated_at?: string
          water_ml?: number | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          meals?: Json
          notes?: string | null
          recorded_at?: string
          updated_at?: string
          water_ml?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: Database["public"]["Enums"]["message_type"]
          sender_id: string
          thread_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"]
          sender_id: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"]
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean | null
          link_url: string | null
          read_at: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          sent_via: string[] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          link_url?: string | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          sent_via?: string[] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          link_url?: string | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          sent_via?: string[] | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_plans: {
        Row: {
          calories_target: number | null
          carbs_g: number | null
          created_at: string
          customer_id: string
          fat_g: number | null
          id: string
          is_active: boolean | null
          meals: Json
          notes: string | null
          protein_g: number | null
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          calories_target?: number | null
          carbs_g?: number | null
          created_at?: string
          customer_id: string
          fat_g?: number | null
          id?: string
          is_active?: boolean | null
          meals?: Json
          notes?: string | null
          protein_g?: number | null
          title?: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          calories_target?: number | null
          carbs_g?: number | null
          created_at?: string
          customer_id?: string
          fat_g?: number | null
          id?: string
          is_active?: boolean | null
          meals?: Json
          notes?: string | null
          protein_g?: number | null
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_plans_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrition_plans_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          contract_id: string
          created_at: string
          currency: string
          description: string | null
          id: string
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id: string | null
        }
        Insert: {
          amount_cents?: number
          contract_id: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id?: string | null
        }
        Update: {
          amount_cents?: number
          contract_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      progress_metrics: {
        Row: {
          body_fat_percent: number | null
          created_at: string
          customer_id: string
          id: string
          muscle_mass_kg: number | null
          notes: string | null
          recorded_at: string
          weight_kg: number | null
        }
        Insert: {
          body_fat_percent?: number | null
          created_at?: string
          customer_id: string
          id?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          recorded_at?: string
          weight_kg?: number | null
        }
        Update: {
          body_fat_percent?: number | null
          created_at?: string
          customer_id?: string
          id?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          recorded_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_metrics_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_photos: {
        Row: {
          category: Database["public"]["Enums"]["photo_category"] | null
          created_at: string
          customer_id: string
          id: string
          image_url: string
          recorded_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["photo_category"] | null
          created_at?: string
          customer_id: string
          id?: string
          image_url: string
          recorded_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["photo_category"] | null
          created_at?: string
          customer_id?: string
          id?: string
          image_url?: string
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_photos_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          cleanliness: number
          created_at: string
          customer_id: string
          id: string
          is_visible: boolean | null
          knowledge: number
          motivation: number
          punctuality: number
          rating_total: number
          sympathy: number
          text: string | null
          trainer_id: string
        }
        Insert: {
          booking_id?: string | null
          cleanliness: number
          created_at?: string
          customer_id: string
          id?: string
          is_visible?: boolean | null
          knowledge: number
          motivation: number
          punctuality: number
          rating_total: number
          sympathy: number
          text?: string | null
          trainer_id: string
        }
        Update: {
          booking_id?: string | null
          cleanliness?: number
          created_at?: string
          customer_id?: string
          id?: string
          is_visible?: boolean | null
          knowledge?: number
          motivation?: number
          punctuality?: number
          rating_total?: number
          sympathy?: number
          text?: string | null
          trainer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_availability: {
        Row: {
          created_at: string
          date: string | null
          end_time: string | null
          id: string
          is_blocked: boolean | null
          start_time: string | null
          trainer_id: string
          weekday: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          end_time?: string | null
          id?: string
          is_blocked?: boolean | null
          start_time?: string | null
          trainer_id: string
          weekday?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          end_time?: string | null
          id?: string
          is_blocked?: boolean | null
          start_time?: string | null
          trainer_id?: string
          weekday?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_availability_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_category_links: {
        Row: {
          category_id: string
          trainer_id: string
        }
        Insert: {
          category_id: string
          trainer_id: string
        }
        Update: {
          category_id?: string
          trainer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_category_links_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trainer_category_links_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_certificates: {
        Row: {
          created_at: string
          document_url: string | null
          id: string
          is_verified: boolean | null
          issuer: string
          name: string
          trainer_id: string
          verified_at: string | null
          year: string | null
        }
        Insert: {
          created_at?: string
          document_url?: string | null
          id?: string
          is_verified?: boolean | null
          issuer: string
          name: string
          trainer_id: string
          verified_at?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string
          document_url?: string | null
          id?: string
          is_verified?: boolean | null
          issuer?: string
          name?: string
          trainer_id?: string
          verified_at?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_certificates_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_packages: {
        Row: {
          created_at: string
          description: string | null
          duration_weeks: number
          id: string
          is_active: boolean | null
          name: string
          price: number
          sessions: number
          sort_order: number | null
          trainer_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_weeks?: number
          id?: string
          is_active?: boolean | null
          name: string
          price?: number
          sessions?: number
          sort_order?: number | null
          trainer_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_weeks?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          sessions?: number
          sort_order?: number | null
          trainer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_packages_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_profiles: {
        Row: {
          bio: string | null
          categories: string[] | null
          city: string | null
          created_at: string
          gallery_urls: string[] | null
          hourly_rate: number | null
          id: string
          intro_video_url: string | null
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          profile_image_url: string | null
          radius_km: number | null
          rating_average: number | null
          rating_count: number | null
          stripe_account_id: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          categories?: string[] | null
          city?: string | null
          created_at?: string
          gallery_urls?: string[] | null
          hourly_rate?: number | null
          id?: string
          intro_video_url?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          profile_image_url?: string | null
          radius_km?: number | null
          rating_average?: number | null
          rating_count?: number | null
          stripe_account_id?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          categories?: string[] | null
          city?: string | null
          created_at?: string
          gallery_urls?: string[] | null
          hourly_rate?: number | null
          id?: string
          intro_video_url?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          profile_image_url?: string | null
          radius_km?: number | null
          rating_average?: number | null
          rating_count?: number | null
          stripe_account_id?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_logs: {
        Row: {
          actual_sets: Json
          created_at: string
          customer_id: string
          exercise_id: string
          exercise_name: string
          id: string
          notes: string | null
          plan_id: string | null
          prescribed_reps: string | null
          prescribed_sets: number | null
          prescribed_weight: string | null
          recorded_at: string
        }
        Insert: {
          actual_sets?: Json
          created_at?: string
          customer_id: string
          exercise_id: string
          exercise_name: string
          id?: string
          notes?: string | null
          plan_id?: string | null
          prescribed_reps?: string | null
          prescribed_sets?: number | null
          prescribed_weight?: string | null
          recorded_at?: string
        }
        Update: {
          actual_sets?: Json
          created_at?: string
          customer_id?: string
          exercise_id?: string
          exercise_name?: string
          id?: string
          notes?: string | null
          plan_id?: string | null
          prescribed_reps?: string | null
          prescribed_sets?: number | null
          prescribed_weight?: string | null
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "workout_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_plans: {
        Row: {
          created_at: string
          customer_id: string
          exercises: Json
          id: string
          is_active: boolean | null
          notes: string | null
          title: string
          trainer_id: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          customer_id: string
          exercises?: Json
          id?: string
          is_active?: boolean | null
          notes?: string | null
          title?: string
          trainer_id: string
          updated_at?: string
          week_number?: number
        }
        Update: {
          created_at?: string
          customer_id?: string
          exercises?: Json
          id?: string
          is_active?: boolean | null
          notes?: string | null
          title?: string
          trainer_id?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_plans_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "trainer_profiles"
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
      audit_action: "insert" | "update" | "delete" | "login" | "export"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
      contract_status: "draft" | "active" | "paused" | "completed" | "cancelled"
      lead_status:
        | "new"
        | "contacted"
        | "in_progress"
        | "converted"
        | "declined"
        | "lost"
      message_type: "text" | "image" | "file" | "system"
      notification_type:
        | "booking"
        | "message"
        | "contract"
        | "payment"
        | "review"
        | "system"
      payment_status: "pending" | "succeeded" | "failed" | "refunded"
      photo_category: "front" | "side" | "back" | "other"
      subscription_tier: "starter" | "pro"
      user_role: "customer" | "trainer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  T extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<
  T extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<
  T extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][T]["Update"]
export type Enums<
  T extends keyof DefaultSchema["Enums"],
> = DefaultSchema["Enums"][T]
