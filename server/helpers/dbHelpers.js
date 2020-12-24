module.exports = (db) => {

  const addPublicMsg = (id, msg) => {
    const qs = `
      INSERT INTO public (user_id, description)
      VALUES ($1, $2)
      RETURNING *
    ;`;
    const qp = [id, msg];
    return db
      .query(qs, qp)
      .then(res => res.rows);
  };
  const getPublic = () => {
    const qs = `
    SELECT public.*, username FROM public 
    JOIN users ON user_id = users.id
    ORDER BY time
    ;`;
    return db
    .query(qs)
    .then(res => res.rows);
  }

  return {
    addPublicMsg,
    getPublic
  };
}