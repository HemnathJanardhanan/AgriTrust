export const GET_PENDING_FARMS = `
  SELECT
      f.id AS farm_id,
      f.name AS farm_name,
      f.certification_status,
      f.certification_submitted_at,
      f.created_at,

      fr.id AS farmer_id,
      fr.village,
      fr.taluk,
      fr.district,
      fr.state,

      u.full_name AS farmer_name,
      u.email AS farmer_email,
      u.phone_number
  FROM farm f
  JOIN farmer fr ON fr.id = f.farmer_id
  JOIN app_user u ON u.id = fr.user_id
  WHERE f.certification_status = 'SUBMITTED'
  ORDER BY f.certification_submitted_at ASC
`;

export const LOCK_FARM_FOR_DECISION = `
  SELECT id, certification_status
  FROM farm
  WHERE id = $1
  FOR UPDATE
`;

export const APPROVE_FARM = `
  UPDATE farm
  SET
    certification_status = 'CERTIFIED',
    certified_at = now(),
    certified_by = $2,
    remarks = $3,
    updated_at = now()
  WHERE id = $1
`;

export const REJECT_FARM = `
  UPDATE farm
  SET
    certification_status = 'REJECTED',
    certified_at = NULL,
    certified_by = NULL,
    remarks = $2,
    updated_at = now()
  WHERE id = $1
`;
