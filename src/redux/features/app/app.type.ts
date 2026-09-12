export interface TClient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  target_destination: string;
  visa: string;
  target_arrival_timeline: string;
  household_size: string;
  lead_advisor_name: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TCreateClientInput {
  full_name: string;
  email: string;
  phone: string;
  target_destination: string;
  visa: string;
  target_arrival_timeline: string;
  household_size: string;
  lead_advisor_name: string;
  notes?: string;
}

export interface TRequestedClient {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  relocation_process_type: string;
  considering_places_type: string[];
  scouting_people_type: string;
  created_at?: string;
}
