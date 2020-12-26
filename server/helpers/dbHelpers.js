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
    SELECT public.*, username, users.profile_pic FROM public 
    JOIN users ON user_id = users.id
    ORDER BY time
    ;`;
    return db
    .query(qs)
    .then(res => res.rows);
  }
  const newUser = (name) => {
    const qs = `
    INSERT INTO users (username) VALUES ($1)
    RETURNING *;`;
    const qp = [name];
    return db.query(qs, qp)
    .then(res => res.rows)
  }
  const postPublic = (id, msg) => {
    
    const qs = `
    INSERT INTO public (user_id, description)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const qp = [id, msg];
    return db.query(qs, qp)
    .then(res => res.rows);
  }
  const getUserByName = () => {

  }

  return {
    addPublicMsg,
    getPublic,
    newUser,
    postPublic
  };
}