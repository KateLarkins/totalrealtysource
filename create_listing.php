// Function to post image with text on Facebook Page
function postImageWithTextOnFacebook($pageAccessToken, $imageUrl, $caption) {
    // Construct URL
    $url = "https://graph.facebook.com/{page_id}/photos";

    // Create POST data
    $postData = array(
        'url' => $imageUrl,
        'caption' => $caption,
        'access_token' => $pageAccessToken
    );

    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session
    $response = curl_exec($ch);

    // Close cURL session
    curl_close($ch);

    // Return response
    return json_decode($response, true);
}

// Function to post image with text on Instagram Business Account
function postImageWithTextOnInstagram($instagramAccessToken, $imageUrl, $caption) {
    // Construct URL
    $url = "https://graph.instagram.com/me/media";

    // Create POST data
    $postData = array(
        'image_url' => $imageUrl,
        'caption' => $caption,
        'access_token' => $instagramAccessToken
    );

    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session
    $response = curl_exec($ch);

    // Close cURL session
    curl_close($ch);

    // Return response
    return json_decode($response, true);
}

// Example usage
$pageAccessToken = 'your_page_access_token';
$instagramAccessToken = 'your_instagram_access_token';
$imageUrl = 'URL_to_your_image.jpg'; // URL of the image you want to post
$caption = 'Check out our new listing!';

// Post image with text on Facebook
$facebookResponse = postImageWithTextOnFacebook($pageAccessToken, $imageUrl, $caption);

// Post image with text on Instagram
$instagramResponse = postImageWithTextOnInstagram($instagramAccessToken, $imageUrl, $caption);

// Handle responses as needed
var_dump($facebookResponse);
var_dump($instagramResponse);
