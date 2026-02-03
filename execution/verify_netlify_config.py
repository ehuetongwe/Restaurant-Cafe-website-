import os
import toml
import sys

def verify_config():
    """Verify netlify.toml exists and is valid."""
    config_path = "netlify.toml"
    
    if not os.path.exists(config_path):
        print(f"Error: {config_path} not found.")
        sys.exit(1)
        
    try:
        config = toml.load(config_path)
    except Exception as e:
        print(f"Error parsing {config_path}: {e}")
        sys.exit(1)
        
    build_config = config.get('build', {})
    publish_dir = build_config.get('publish')
    
    if not publish_dir:
        print("Warning: 'publish' directory not specified in [build].")
    else:
        if not os.path.exists(publish_dir):
            print(f"Warning: Publish directory '{publish_dir}' does not exist.")
            # Verify if it's created during build? Since we are local, we expect it might exist or be created.
        else:
            print(f"Success: Publish directory '{publish_dir}' exists.")

    print(f"Configuration verified: {config_path}")

if __name__ == "__main__":
    verify_config()
