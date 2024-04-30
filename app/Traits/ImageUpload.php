<?php
namespace App\Traits;

use App\Models\Image;

trait ImageUpload
{
    private function imageUpload($images, $folderName, $moduleName, $moduleId, $userId,$names = null)
    {
        if (!is_array($images)) {
            $images = [$images];
        }

        $imageNames = [];

        foreach ($images as $index => $base64Image) {
            // Decode base64 image data
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));

            // Original filename without extension
            $originalName = 'image_' . $index;  // You may want to generate a more meaningful name

            // Make path of the directory to store image
            $path = 'images/' . $folderName;

            // Full path to the public directory
            $publicPath = public_path($path);

            // Check if the directory exists, if not, create it
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0755, true);
            }

            // Save the image in the public directory
            file_put_contents($publicPath . '/' . $originalName . '.jpg', $imageData);

            // Create a new record in the 'images' table
            Image::create([
                'module_name' => $moduleName,
                'module_id' => $moduleId,
                'image' => $originalName . '.jpg',
                'created_by' => $userId,
            ]);

            // Add the image name to the array
            $imageNames[] = $originalName . '.jpg';
        }

        return $imageNames;
    }

    private function ImagesUrl($data,$moduleName){
        foreach ($data as $i) {
            $Image = Image::where(['module_name' => $moduleName, 'module_id' => $i->id])->pluck('image')->first();
            if ($Image) {
                $i->image_url = asset('images/'.$moduleName.'/' . $Image);
            } else {
                $i->image_url = null;
            }
        }

        return $data;
    }
}
