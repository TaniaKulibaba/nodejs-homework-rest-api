const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const { user: service } = require('../../services');

const IMG_DIR = path.join(__dirname, "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { file } = req;
  const id = req.user.id;
  try {
    if (req.file) {
      const img = await jimp.read(file.path);
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(file.path)
      await fs.rename(file.path, path.join(IMG_DIR, file.originalname))
    };
    const avatarNewPath = path.join(IMG_DIR, Date.now() + "-" + file.originalname);
    const result = await service.updateById(id, { avatarURL: avatarNewPath });
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: result.avatarURL,
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
