const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const { user: service } = require('../../services');

const updateAvatar = async (req, res, next) => {
  const id = req.user.id;
  const pathFile = req.file.path;
  const avatarURL = await service.updateById(id, pathFile),
  try {
    async (req, res, next) => {
      if (req.file) {
        const { file } = req
        const img = await jimp.read(file.path)
        await img
          .autocrop()
          .cover(
            250,
            250,
            jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
          .writeAsync(file.path)
        await fs.rename(file.path, path.join(IMG_DIR, file.originalname))
      }
    };
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
